const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJob = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs });
};

const getSingleJob = async (req, res) => {
  console.log(req.user);
  const { id: jobId } = req.params;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: req.user.userId,
  });

  if(!job){
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  console.log(job);
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const {company, position} = req.body

  if(!company || !position){
    throw new BadRequestError('Company or position field both should be entered')
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: req.user.userId },
    req.body, // { company: "meta" }
    { new: true, runValidators: true }
  );
  
  console.log(job); // Log the updated document
  res.status(StatusCodes.OK).json({job})
};
const deleteJob = async (req, res) => {
  const {id: jobId} = req.params
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: req.user.userId
  })

  res.status(StatusCodes.OK).json({msg: 'Job deleted successfully', job})
};

module.exports = {
  getAllJob,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
};
