const { Router } = require('express');
const { getHealth } = require('../controllers/health.controller');
const router = Router();
/**
 * @swagger
 * /dev/health:
 * get:
 *    summary:get health route
 *    responses:
 *       200:     
 */
router.get('/health', getHealth);

module.exports = router;