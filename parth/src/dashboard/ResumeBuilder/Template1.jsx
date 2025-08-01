// Template1.jsx
const Template1 = ({ data = {} }) => {
  const { name, email, phone, education = [], skills = [], summary } = data;

  return (
    <div className="bg-white text-black p-6 border rounded-md shadow-sm">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>{email} | {phone}</p>
      <p className="mt-2 italic">{summary}</p>

      <h2 className="mt-4 font-semibold">Education</h2>
      <ul className="list-disc list-inside text-sm">
        {education.map((edu, i) => (
          <li key={i}>{edu.degree} at {edu.institution}</li>
        ))}
      </ul>

      <h2 className="mt-4 font-semibold">Skills</h2>
      <p className="text-sm">{skills.join(", ")}</p>
    </div>
  );
};

export default Template1;
