// Assuming AdminUserSearchBar component
import React from 'react';

interface AdminUserSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const AdminUserSearchBar: React.FC<AdminUserSearchBarProps> = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <div className="mb-4 flex items-center space-x-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyPress}
        className="border p-2 w-full"
        placeholder="Search users..."
      />
      <button onClick={onSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
    </div>
  );
};

export default AdminUserSearchBar;
