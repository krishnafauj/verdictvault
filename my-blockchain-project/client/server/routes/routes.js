import { Router } from 'express';
import { verifyPoliceUser } from '../controller/police_login.js';  // Correct import// Assuming this is your controller
import lawyerlogin from '../controller/lawyer_login.js';
import register_case from '../controller/registercase.js';
import casefile from '../controller/casefile.js';
import lawyerdoc from '../controller/lawyerdoc.js';
import judgelogin from '../controller/judgelogin.js';
import judgeverdict from '../controller/judgeverdict.js';
import caseview from '../controller/case.js';
const router = Router();

router
  .post('/verify/police', verifyPoliceUser)
  .post('/verify/lawyer', lawyerlogin)
  .post('/register/user', register_case)
  .post('/api/cases', casefile)
  .post('/verify/judge',judgelogin)
  .post('/verdict',judgeverdict)
  .post('/cid',lawyerdoc)
  .post('/caseview',caseview);
export default router;