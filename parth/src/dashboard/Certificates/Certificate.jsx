import React, { useState } from 'react';

export default function Certificate() {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "Deloitte Forage",
      description: "A certificate that leads to different upbringings",
      link: "https://certification.com"
    }
  ]);

  const [isCertificateOpen, setCertificateOpen] = useState(false);
  const [isCertificateEdit, setCertificateEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    link: ""
  });

  const inputHandleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const inputHandleAdd = () => {
    setFormData({ id: null, title: "", description: "", link: "" });
    setCertificateEdit(false);
    setCertificateOpen(true);
  };

  const handleClick = (certificate) => {
    setFormData(certificate);
    setCertificateEdit(true);
    setCertificateOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isCertificateEdit) {
      setCertificates(prev =>
        prev.map(cert => (cert.id === formData.id ? formData : cert))
      );
    } else {
      setCertificates(prev => [
        ...prev,
        { ...formData, id: Date.now() }
      ]);
    }
    setCertificateOpen(false);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Certificate link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Certificates</h1>
        <button
          onClick={inputHandleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Certificate
        </button>
      </div>

      {certificates.map((cert) => (
        <div key={cert.id} className="border p-4 rounded mb-4 shadow">
          <h2 className="text-xl font-semibold">{cert.title}</h2>
          <p className="text-gray-700">{cert.description}</p>
          <a href={cert.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">
            View Certificate
          </a>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleClick(cert)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleCopyLink(cert.link)}
              className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
            >
              Share
            </button>
          </div>
        </div>
      ))}

      {isCertificateOpen && (
        <form onSubmit={handleFormSubmit} className="bg-gray-100 p-4 rounded shadow mt-6">
          <h2 className="text-xl mb-4">{isCertificateEdit ? 'Edit Certificate' : 'Add Certificate'}</h2>

          <input
            name="title"
            value={formData.title}
            onChange={inputHandleChange}
            placeholder="Certificate Title"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={inputHandleChange}
            placeholder="Certificate Description"
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            name="link"
            value={formData.link}
            onChange={inputHandleChange}
            placeholder="Certificate Link"
            required
            className="w-full mb-4 p-2 border rounded"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isCertificateEdit ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => setCertificateOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
