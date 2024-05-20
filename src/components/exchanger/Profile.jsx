import React from 'react';
import Avatar from 'react-avatar';

function Profile() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-red-500 to-blue-500 py-8 px-6 md:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <Avatar name="Jared Palmer" size="48" round={true} />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Jared Palmer</h1>
              <p className="text-sm">@jaredpalmer</p>
            </div>
          </div>
          <div>
            <button className="text-black hover:bg-black/20 border border-black py-2 px-4 rounded">Edit Profile</button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 py-8 px-6 md:px-12">
        <div className="max-w-4xl mx-auto grid gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Location", value: "San Francisco, CA", color: "text-red-500" },
                { title: "Occupation", value: "Software Engineer", color: "text-blue-500" },
                { title: "Contact Info", value: "jared@example.com", color: "text-red-500" },
                {
                  title: "Social Media",
                  value: (
                    <>
                      <button className="text-blue-500 hover:underline" onClick={() => window.open('https://twitter.com')}>Twitter</button> | <button className="text-blue-500 hover:underline" onClick={() => window.open('https://linkedin.com')}>LinkedIn</button>
                    </>
                  ),
                  color: "text-blue-500",
                },
              ].map((info, idx) => (
                <div key={`info-${idx}`} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className={`text-lg font-bold mb-2 ${info.color}`}>{info.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Product Publications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {["Product A", "Product B", "Product C"].map((product, idx) => (
                <div key={`product-${idx}`} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <Avatar name={product} size="64" round={true} />
                  </div>
                  <div className="p-4">
                    <h3 className={`text-lg font-bold mb-2 ${idx % 2 === 0 ? 'text-red-500' : 'text-blue-500'}`}>{product}</h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Published: May 20, 2024</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Comments</h2>
            <div className="space-y-4">
              {[
                { name: "John Doe", comment: "Great product! I've been using it for a week and it's been a game-changer.", daysAgo: "2 days ago", color: "text-red-500" },
                { name: "Jane Smith", comment: "I'm really impressed with the quality of this product. Highly recommended!", daysAgo: "5 days ago", color: "text-blue-500" },
              ].map((comment, idx) => (
                <div key={`comment-${idx}`} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-md bg-gray-200 flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                      <Avatar name={comment.name} size="48" round={true} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-bold ${comment.color}`}>{comment.name}</h3>
                        <div className="flex items-center gap-0.5 text-yellow-500">
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5" />
                          <StarIcon className="h-5 w-5 text-gray-300" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{comment.daysAgo}</p>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <MoveVerticalIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MoveVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default Profile;
