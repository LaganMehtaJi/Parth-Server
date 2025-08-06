// Template3.jsx
const Template3 = ({ data = {} }) => {
  const { name, email, phone, education = [], skills = [], summary } = data;

  return (
    <div className="bg-[#003049] text-white p-6 border rounded-md shadow">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-gray-300">{email} | {phone}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p className="text-sm">{summary}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <ul className="list-disc list-inside text-sm">
          {education.map((edu, i) => (
            <li key={i}>{edu.degree} at {edu.institution}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <p className="text-sm">{skills.join(", ")}</p>
      </div>
    </div>
  );
};

export default Template3;
