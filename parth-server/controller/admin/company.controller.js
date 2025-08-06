
export const createCompany = async (req, res) => {
    console.log(res.data);
    res.status(201).json({ message: "Company created successfully" });
};
export const getAllCompany = async (req, res) => {
    try {
        // const data = await Company.find();
        data = [
            {
                id: 1,
                name: "Tech Innovators",
                description: "Leading the way in tech solutions",
                location: "San Francisco, CA",
                jobsAvailable: 5,
            },
            {
                id: 2,
                name: "Green Energy Corp",
                description: "Pioneering sustainable energy solutions",
                location: "Austin, TX",
                jobsAvailable: 3,
            },
            {
                id: 3,
                name: "HealthPlus",
                description: "Innovating healthcare for a better tomorrow",
                location: "New York, NY",
                jobsAvailable: 2,
            }
        ]
        res.send(data);
    } catch (error) {
        console.error("Error getting companies:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

