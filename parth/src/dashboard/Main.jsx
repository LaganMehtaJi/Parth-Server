const Card = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow-md w-full">
    <h2 className="font-semibold mb-2 text-lg">{title}</h2>
    <div className="text-sm text-gray-700">{children}</div>
  </div>
);

const Main= () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Applied Jobs">
        Count: Number of jobs the student has applied to.<br />
        Latest Application: Company name & role.<br />
        Status: (Under review, shortlisted)
      </Card>
      <Card title="Shortlisted">
        Total shortlists<br />
        Next interview<br />
        Latest company<br />
        Status
      </Card>
      <Card title="Resume Status">
        Last updated<br />
        Format Type<br />
        Completeness status
      </Card>
      <Card title="Upcoming Events/Interviews">
        Total Upcoming interviews<br />
        Next interview<br />
        Date & Time<br />
        Interview mode<br />
        Stages
      </Card>
      <Card title="Resume Insights">
        Resume score<br />
        Last reviewed on<br />
        Missing or weak sections<br />
        TPO feedback
      </Card>
    </div>
  );
};

export default Main;
