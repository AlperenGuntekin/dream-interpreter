import { useState } from 'react';
import Link from 'next/link';
import { Dream } from '../interfaces/dream';
import dreams from '../data/dreams.json';

const DreamList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDreams = dreams.filter((dream) =>
    dream.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Dream Journal</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search dreams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <ul className="space-y-4">
        {filteredDreams.map((dream) => (
          <li
            key={dream.slug}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
          >
            <Link
              href={`/dreams/${dream.slug}`}
              className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {dream.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {dream.description.slice(0, 100)}...
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DreamList;
