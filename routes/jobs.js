const express = require('express')
const router = express.Router()

const {getAllJob, getSingleJob, createJob, deleteJob, updateJob} = require('../controllers/jobs')

router.route('/').post(createJob).get(getAllJob)
router.route('/:id').get(getSingleJob).delete(deleteJob).patch(updateJob)

module.exports = router