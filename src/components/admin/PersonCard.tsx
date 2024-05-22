export default function PersonCard({ name, email, phone, dni }) {
    return (
      <div className="bg-white rounded-lg shadow-lg dark:bg-gray-950">
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500 dark:text-gray-400">{email}</p>
          <p className="text-gray-500 dark:text-gray-400">{phone}</p>
          <p className="text-gray-500 dark:text-gray-400">{dni}</p>
        </div>
      </div>
    );
  }
  