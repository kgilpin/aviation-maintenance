import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { useMembershipData } from '@/hooks/useMembershipData';

export function Membership() {
  const { membershipData, loading, error } = useMembershipData();

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (error || !membershipData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center text-red-600">Error loading membership data</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>{membershipData.seo.title}</title>
        <meta name="description" content={membershipData.seo.description} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8 text-black">
          {membershipData.title}
        </h1>
        
        <div className="space-y-12">
          {/* Applications Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-black">
              {membershipData.applications.title}
            </h2>
            
            <p className="mb-4 text-gray-700">
              {membershipData.applications.description}
            </p>
            
            <p className="mb-2 text-gray-700">To apply for membership, you must:</p>
            
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
              {membershipData.applications.requirements.map((requirement, index) => (
                <li key={index} className="text-gray-700">
                  {requirement.text}{' '}
                  {requirement.link && (
                    <>
                      {requirement.link.external ? (
                        <ExternalLink
                          href={requirement.link.href}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {requirement.link.label}
                        </ExternalLink>
                      ) : (
                        <Link
                          to={requirement.link.href.replace('.html', '')}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {requirement.link.label}
                        </Link>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            
            <p className="text-gray-700">
              {membershipData.applications.afterVoting}
            </p>
          </section>

          {/* Dues Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-black">
              {membershipData.dues.title}
            </h2>
            
            {membershipData.dues.generalInfo.map((info, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {info}
              </p>
            ))}
            
            <p className="mb-4 text-red-600 font-bold">
              {membershipData.dues.importantNote}
            </p>
            
            {membershipData.dues.seasonalInfo.map((info, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {info}
              </p>
            ))}

            {/* Dues Structure Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <caption className="text-center font-bold italic mb-2">
                  Dues Structure
                </caption>
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Membership Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Annual Fee</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Comments</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Join in September & October</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Join in November & December</th>
                  </tr>
                </thead>
                <tbody>
                  {membershipData.dues.membershipTypes.map((membership, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{membership.type}</td>
                      <td className="border border-gray-300 px-4 py-2">{membership.annualFee}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {membership.comments && (
                          <div className="whitespace-pre-line">
                            {membership.comments}
                          </div>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{membership.septOctFee}</td>
                      <td className="border border-gray-300 px-4 py-2">{membership.novDecFee}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Application Fee</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{membershipData.dues.applicationFee.amount}</td>
                    <td className="border border-gray-300 px-4 py-2">{membershipData.dues.applicationFee.description}</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}