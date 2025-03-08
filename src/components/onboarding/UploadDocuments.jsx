import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function UploadDocuments({ onPrevious }) {
  const requiredDocuments = [
    {
      type: 'businessRegistration',
      name: 'Business Registration',
      description: 'Certificate of incorporation or business registration document'
    },
    {
      type: 'bankStatement',
      name: 'Bank Statement',
      description: 'Recent bank statement (last 3 months)'
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
          Upload Business Documents
        </h1>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <p className="text-gray-600 text-center mb-6">
            Please upload the following documents to complete your business verification.
            All documents should be in PDF, JPG, or PNG format with a size limit of 10MB.
          </p>

          <form className="space-y-6">
            {requiredDocuments.map((doc) => (
              <div key={doc.type} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{doc.description}</p>
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      <span>example_document.pdf</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <label className="relative">
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <div className="px-4 py-2 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 cursor-pointer">
                        Replace
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={onPrevious}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#0049ac] rounded-md hover:bg-[#0049ac]/90"
              >
                Submit Documents
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadDocuments;