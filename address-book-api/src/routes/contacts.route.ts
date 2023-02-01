import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { createContact, deleteContact, getContact, getContacts, updateContact } from '../controllers/contact.controller'

const router = Router()

const postValidator = () => {
    const validator = celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().min(2).max(255).required(),
            surname: Joi.string().min(2).max(255).required(),
            email: Joi.string().required().email().max(255),
            phone: Joi.string().regex(new RegExp('[0-9]{7}')).messages({'string.pattern.base': `Phone number must have at least 7 digits and only be numbers.`}).min(7).max(255).required(),
            photoUrl: Joi.string().uri().max(255).allow(""),
            about: Joi.string().allow(""),
        }),
    })
    return validator
}

const putValidator = () => {
    const validator = celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().integer().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().min(2).max(255),
            surname: Joi.string().min(2).max(255),
            email: Joi.string().email().max(255),
            phone: Joi.string().regex(new RegExp('[0-9]{7}')).min(7).max(255),
            photoUrl: Joi.string().uri().max(255).allow(""),
            about: Joi.string().allow("").max(255),
        }),
    })
    return validator
}

router.get('/', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        limit: Joi.number().integer().required(),
        offset: Joi.number().integer().required(),
        searchText: Joi.string().allow("")
    })}), getContacts)

router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required()
    })
}), getContact)


router.post('/', postValidator(), createContact)

router.put('/:id', putValidator(), updateContact)

router.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
}), deleteContact)

export default router