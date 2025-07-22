import * as CompanyModel from "../../model/company.model.js";

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.Company.find();

    const detailedCompanies = await Promise.all(
      companies.map(async (company) => {
        const companyId = company._id;

        const [applyData, responsibilities, requirements, resources] = await Promise.all([
          CompanyModel.ApplyCount.findOne({ company: companyId }),
          CompanyModel.Responsibility.find({ company: companyId }).select('responsibility -_id'),
          CompanyModel.Requirement.find({ company: companyId }).select('requirement -_id'),
          CompanyModel.Resource.find({ company: companyId }).select('resource link -_id'),
        ]);

        return {
          id: companyId,
          name: company.name,
          logoUrl: company.logoUrl,
          description: company.description,
          createdAt: company.createdAt,
          applyCount: applyData ? applyData.count : 0,
          responsibilities: responsibilities.map(r => r.responsibility),
          requirements: requirements.map(r => r.requirement),
          resources,
        };
      })
    );

    res.status(200).json({ companies: detailedCompanies });

  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
