import React from 'react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Help & Support</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-medium text-gray-800">❓ How can I reset my password?</p>
                <p className="text-gray-600">Go to the settings page, click "Change Password", and follow the instructions.</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">❓ How do I contact support?</p>
                <p className="text-gray-600">You can contact us at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>.</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">❓ Can I change my email address?</p>
                <p className="text-gray-600">Yes, go to the account section in your profile and click "Edit".</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Still need help?</h2>
            <p className="text-gray-600 mb-4">If your question isn’t listed, feel free to reach out to us.</p>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
