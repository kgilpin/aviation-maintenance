#!/usr/bin/env npx tsx

import fs from 'fs/promises';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import type { ImageConfig } from '../src/data/types';

interface CloudflareConfig {
  accountId: string;
  apiToken: string;
  accountHash: string;
}

interface SyncOptions {
  dryRun?: boolean;
  force?: boolean; // Force re-upload even if image exists
  updateConfig?: boolean; // Update imageConfig.json after sync
}

class CloudflareImageSync {
  private config: CloudflareConfig;
  private imageConfig: ImageConfig;
  private assetsDir: string;
  
  constructor(config: CloudflareConfig) {
    this.config = config;
    this.assetsDir = path.join(process.cwd(), 'src/assets/images');
  }
  
  async loadImageConfig(): Promise<void> {
    const configPath = path.join(process.cwd(), 'src/data/imageConfig.json');
    const configContent = await fs.readFile(configPath, 'utf-8');
    this.imageConfig = JSON.parse(configContent);
  }
  
  async syncImages(options: SyncOptions = {}): Promise<void> {
    console.log('🔄 Starting Cloudflare Images sync...');
    
    await this.loadImageConfig();
    const mappings = this.imageConfig.mappings;
    
    for (const [localPath, mapping] of Object.entries(mappings)) {
      try {
        const imagePath = this.resolveLocalPath(localPath);
        const exists = await this.checkImageExists(mapping.cloudflareId);
        
        if (exists && !options.force) {
          console.log(`✅ ${mapping.cloudflareId} already exists, skipping...`);
          continue;
        }
        
        if (options.dryRun) {
          console.log(`🔍 DRY RUN: Would upload ${imagePath} as ${mapping.cloudflareId}`);
          continue;
        }
        
        console.log(`📤 Uploading ${imagePath}...`);
        const result = await this.uploadImage(imagePath, mapping.cloudflareId, mapping.alt);
        
        if (result.success) {
          console.log(`✅ Successfully uploaded ${mapping.cloudflareId}`);
        } else {
          console.error(`❌ Failed to upload ${mapping.cloudflareId}:`, result.errors);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${localPath}:`, error);
      }
    }
    
    if (options.updateConfig && !options.dryRun) {
      await this.updateConfigForProduction();
    }
    
    console.log('🎉 Sync complete!');
  }
  
  private resolveLocalPath(jsonPath: string): string {
    // Convert JSON path like "/src/assets/images/file.jpg" to actual file path
    const relativePath = jsonPath.replace(/^\/src\/assets\/images\//, '');
    return path.join(this.assetsDir, relativePath);
  }
  
  private async checkImageExists(imageId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.config.accountId}/images/v1/${imageId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.config.apiToken}`,
          },
        }
      );
      
      return response.ok;
    } catch {
      return false;
    }
  }
  
  private async uploadImage(filePath: string, imageId: string, alt: string): Promise<{ success: boolean; errors?: unknown[] }> {
    const imageBuffer = await fs.readFile(filePath);
    const form = new FormData();
    
    form.append('file', imageBuffer, {
      filename: path.basename(filePath),
      contentType: this.getMimeType(filePath),
    });
    form.append('id', imageId);
    form.append('metadata', JSON.stringify({ alt }));
    
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.config.accountId}/images/v1`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        },
        body: form,
      }
    );
    
    return await response.json();
  }
  
  private getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    };
    
    return mimeTypes[ext] || 'image/jpeg';
  }
  
  private async updateConfigForProduction(): Promise<void> {
    console.log('📝 Updating imageConfig.json for production...');
    
    // Switch to Cloudflare provider and enable it
    this.imageConfig.provider = 'cloudflare';
    this.imageConfig.providers.cloudflare.enabled = true;
    
    // Update the base URL with actual account hash
    this.imageConfig.providers.cloudflare.baseUrl = 
      `https://imagedelivery.net/${this.config.accountHash}/`;
    
    const configPath = path.join(process.cwd(), 'src/data/imageConfig.json');
    await fs.writeFile(configPath, JSON.stringify(this.imageConfig, null, 2));
    
    console.log('✅ Configuration updated for production use');
  }
  
  async listImages(): Promise<void> {
    console.log('📋 Listing Cloudflare Images...');
    
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.config.accountId}/images/v1`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
        },
      }
    );
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`Found ${data.result.images.length} images:`);
      for (const image of data.result.images) {
        console.log(`  - ${image.id} (${image.filename})`);
      }
    } else {
      console.error('Failed to list images:', data.errors);
    }
  }
}

// CLI Usage
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  // Load config from environment variables
  const config: CloudflareConfig = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    apiToken: process.env.CLOUDFLARE_API_TOKEN!,
    accountHash: process.env.CLOUDFLARE_ACCOUNT_HASH!,
  };
  
  if (!config.accountId || !config.apiToken || !config.accountHash) {
    console.error('❌ Missing required environment variables:');
    console.error('   CLOUDFLARE_ACCOUNT_ID');
    console.error('   CLOUDFLARE_API_TOKEN');
    console.error('   CLOUDFLARE_ACCOUNT_HASH');
    console.error('');
    console.error('Create a .env file with these values or export them.');
    process.exit(1);
  }
  
  const sync = new CloudflareImageSync(config);
  
  switch (command) {
    case 'sync': {
      const options: SyncOptions = {
        dryRun: args.includes('--dry-run'),
        force: args.includes('--force'),
        updateConfig: args.includes('--update-config'),
      };
      await sync.syncImages(options);
      break;
    }
      
    case 'list':
      await sync.listImages();
      break;
      
    default:
      console.log('Usage:');
      console.log('  npm run cloudflare-sync sync [--dry-run] [--force] [--update-config]');
      console.log('  npm run cloudflare-sync list');
      console.log('');
      console.log('Options:');
      console.log('  --dry-run       Show what would be uploaded without actually uploading');
      console.log('  --force         Re-upload images even if they already exist');
      console.log('  --update-config Update imageConfig.json to use Cloudflare in production');
      break;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export default CloudflareImageSync;