import React, { useEffect } from "react"
import Grid from '@mui/material/Unstable_Grid2'
import { Form, Formik, FormikHelpers, FormikProps } from "formik"

import {
    ButtonLink,
    Content,
    DeleteButton,
    ErrorMessage,
    FormContainer,
    FormStatus,
    OptionsContainer,
    TextField,
    Title
} from "./Styles"

import * as Yup from 'yup'
import { CONTACT_BASE_PATH } from "../../../Constants"
import { Button, Image, ImageContainer, SpinnerContainer } from "../CommonStyles"
import Spinner from "../../Spinner/Spinner"

interface IContactForm {
    name: string,
    surname: string,
    email: string,
    phone: string,
    photoUrl?: string,
    about?: string,
}

interface IFormStatus {
    message: string,
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}
interface IContactProps {
    contactData?: IContactForm,
    edit?: boolean,
    onSubmit: (form: IContactForm) => void,
    onDelete?: () => void,
    isLoading?: boolean,
}
const ContactForm: React.FC<IContactProps> = ({ contactData, edit, onSubmit, onDelete, isLoading = false }) => {
    const [displayFormStatus, setDisplayFormStatus] = React.useState(false)
    const [formData, setFormData] = React.useState<IContactForm>({
        name: '',
        surname: '',
        phone: '',
        email: '',
        photoUrl: '',
        about: ''
    })
    const [formStatus, setFormStatus] = React.useState<IFormStatus>({
        message: '',
        type: '',
    })

    useEffect(() => {
        if (edit && contactData) {
            setFormData(contactData)
        }
    }, [contactData, edit])

    const onFormSubmit = async (values: IContactForm, actions: FormikHelpers<IContactForm>) => {
        try {
            await onSubmit(values)
            actions.resetForm({})
        } catch (error: any) {
            if (error.statusCode && error.message) {
                switch (error.statusCode) {
                    case 400:
                    case 404:
                        setFormStatus({ message: error.reason ? error.reason : error.message, type: 'error' })
                        break;
                    default:
                        setFormStatus(formStatusProps.error)
                }
            } else {
                setFormStatus(formStatusProps.error)
            }

            setDisplayFormStatus(true)
            actions.setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (onDelete) {
            try {
                await onDelete()
            } catch (error) {
                console.log(error)
                setFormStatus(formStatusProps.error)
                setDisplayFormStatus(true)
            }
        }
    }

    return (
        <FormContainer>
            {isLoading ?
                <SpinnerContainer>
                    <Spinner size={50} />
                </SpinnerContainer>
                :
                <Content>
                    <Formik
                        enableReinitialize={true}
                        initialValues={
                            formData
                        }
                        onSubmit={(values: IContactForm, actions: FormikHelpers<IContactForm>) => {
                            onFormSubmit(values, actions)
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Please enter a first name'),
                            surname: Yup.string().required('Please enter a surname'),
                            email: Yup.string()
                                .email()
                                .required('Please enter a valid email'),
                            phone: Yup.string().matches(new RegExp('[0-9]{7}')).required("A phone number is required"),
                            photoUrl: Yup.string().url().nullable().notRequired(),
                            about: Yup.string().nullable().notRequired()
                        })}
                    >
                        {(props: FormikProps<IContactForm>) => {
                            const {
                                values,
                                touched,
                                errors,
                                handleBlur,
                                handleChange,
                                isSubmitting,
                            } = props
                            return (
                                <Form>
                                    <OptionsContainer>
                                        <ButtonLink to={CONTACT_BASE_PATH}>
                                            Back to contacts
                                        </ButtonLink>

                                        {edit && <DeleteButton onClick={() => handleDelete()}>
                                            Delete
                                        </DeleteButton>}
                                    </OptionsContainer>

                                    {edit ?
                                        formData.photoUrl ?
                                            <ImageContainer>
                                                <Image src={formData.photoUrl} />
                                            </ImageContainer>
                                            : <Title>Update contact</Title>
                                        :
                                        <Title>Create contact</Title>
                                    }
                                    <Grid container spacing={2}>
                                        <Grid
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={6}
                                        >
                                            <TextField
                                                name="name"
                                                id="name"
                                                label="Name"
                                                value={values.name}
                                                type="text"
                                                helperText={
                                                    errors.name && touched.name
                                                        ? errors.name
                                                        : ''
                                                }
                                                error={
                                                    errors.name && touched.name
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                        </Grid>
                                        <Grid
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={6}>
                                            <TextField
                                                name="surname"
                                                id="surname"
                                                label="Surname"
                                                value={values.surname}
                                                type="text"
                                                helperText={
                                                    errors.surname && touched.surname
                                                        ? errors.surname
                                                        : ''
                                                }
                                                error={
                                                    errors.surname && touched.surname
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>

                                        <Grid
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}

                                        >
                                            <TextField
                                                name="email"
                                                id="email"
                                                label="Email"
                                                value={values.email}
                                                type="email"
                                                helperText={
                                                    errors.email && touched.email
                                                        ? 'Please enter a valid email'
                                                        : ''
                                                }
                                                error={
                                                    errors.email && touched.email
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextField
                                                name="phone"
                                                id="phone"
                                                label="Phone"
                                                value={values.phone}
                                                type="tel"

                                                helperText={
                                                    errors.phone && touched.phone
                                                        ? 'Please enter a valid phone'
                                                        : ''
                                                }
                                                error={
                                                    errors.phone && touched.phone
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextField
                                                name="photoUrl"
                                                id="photoUrl"
                                                label="Photo url"
                                                value={values.photoUrl}
                                                type="text"
                                                helperText={
                                                    errors.photoUrl &&
                                                        touched.photoUrl
                                                        ? errors.photoUrl
                                                        : ''
                                                }
                                                error={
                                                    errors.photoUrl &&
                                                        touched.photoUrl
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextField
                                                name="about"
                                                id="about"
                                                label="About"
                                                value={values.about}
                                                type="text"
                                                helperText={
                                                    errors.about &&
                                                        touched.about
                                                        ? errors.about
                                                        : ''
                                                }
                                                error={
                                                    errors.about &&
                                                        touched.about
                                                        ? true
                                                        : false
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                            container
                                            justifyContent='center'
                                        >
                                            {displayFormStatus && (
                                                <FormStatus >
                                                    {formStatus.type ===
                                                        'error' ? (
                                                        <ErrorMessage
                                                        >
                                                            {formStatus.message}
                                                        </ErrorMessage>
                                                    ) : null}
                                                </FormStatus>
                                            )}
                                        </Grid>
                                        <Grid
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                            container
                                            justifyContent='center'
                                        >
                                            <Button
                                                type="submit"
                                                // variant="outlined"
                                                disabled={isSubmitting}
                                            >
                                                {edit ? 'Save' : 'Add'}
                                            </Button>

                                        </Grid>
                                    </Grid>
                                </Form>
                            )
                        }}
                    </Formik>
                </Content>}
        </FormContainer >

    )

}

export default ContactForm