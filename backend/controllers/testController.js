export const adminTest = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin! You have access to this route.",
    user: req.user,
  });
};

export const trainerTest = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Trainer! You have access to this route.",
    user: req.user,
  });
};

export const memberTest = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Member! You have access to this route.",
    user: req.user,
  });
};