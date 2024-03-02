interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search..."
      className="bg-gray-300 text-black px-4 py-2 rounded-lg focus:outline-none focus:ring w-64 placeholder:font-semibold placeholder:text-slate-950"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
