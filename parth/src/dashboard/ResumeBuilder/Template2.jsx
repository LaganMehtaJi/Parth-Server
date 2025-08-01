// Template2.jsx
const Template2 = ({ data = {} }) => {
  const { name, email, phone, education = [], skills = [], summary } = data;

  return (
    <div className="bg-[#fef3f2] text-black p-6 border rounded-md shadow">
      <h1 className="text-xl font-extrabold text-[#e85a4f]">{name}</h1>
      <p>{email} • {phone}</p>
      <div className="mt-2">
        <strong>Summary:</strong>
        <p className="text-sm">{summary}</p>
      </div>
      <div className="mt-2">
        <strong>Education:</strong>
        <ul className="list-disc list-inside text-sm">
          {education.map((edu, i) => (
            <li key={i}>{edu.degree} at {edu.institution}</li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        <strong>Skills:</strong>
        <p className="text-sm">{skills.join(" | ")}</p>
      </div>
    </div>
  );
};

export default Template2;
