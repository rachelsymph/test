import { NextFunction, Request, Response, Router } from 'express';

import { FormField } from 'src/commons/constants/fields';
import {
  findDynamicOptions,
  createDynamicOption,
  deleteDynamicOption,
} from 'src/server/models/DynamicOptionModel';

const router = Router();

async function getDynamicOptions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await findDynamicOptions({
      field: req.query.field as FormField,
    });

    return res.json(products);
  } catch (e) {
    next(e);
  }
}

async function createDynamicOptionsRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await createDynamicOption({
      ...req.body,
    });

    return res.json({
      data: product,
      message: 'Successfully created option!',
    });
  } catch (e) {
    req.log.error(e);

    next(e);
  }
}

async function deleteDynamicOptionRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteDynamicOption(req.params.dynamicOptionId);

    return res.json({
      data: {
        id: req.params.dynamicOptionId,
      },
      message: 'Successfully deleted option!',
    });
  } catch (e) {
    next(e);
  }
}

router.route('/').get(getDynamicOptions);
router.route('/').post(createDynamicOptionsRoute);
router.route('/:dynamicOptionId').delete(deleteDynamicOptionRoute);

export default router;
