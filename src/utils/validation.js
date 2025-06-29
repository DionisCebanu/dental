export const validateContactForm = (formData, t) => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = t('validationErrorRequired');
        }
        if (!formData.email.trim()) {
            errors.email = t('validationErrorRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = t('validationErrorEmail');
        }
        if (!formData.message.trim()) {
            errors.message = t('validationErrorRequired');
        }
        return errors;
    };
    
    export const validateBookingForm = (formData, t) => {
        const errors = {};
        if (!formData.date) {
            errors.date = t('validationErrorDate');
        }
        if (!formData.time) {
            errors.time = t('validationErrorTime');
        }
        if (!formData.guests || parseInt(formData.guests) < 1 || parseInt(formData.guests) > 20) {
            errors.guests = t('validationErrorGuests');
        }
        if (formData.selectedTableId) { // Only validate these if a table is selected / form is fully shown
            if (!formData.name.trim()) {
                errors.name = t('validationErrorRequired');
            }
            if (!formData.phone.trim()) { // Example: Making phone required for full booking
                errors.phone = t('validationErrorRequired');
            } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s+/g, ''))) { // Basic international phone format
                errors.phone = t('validationErrorPhone');
            }
            if (!formData.email.trim()) {
                errors.email = t('validationErrorRequired');
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = t('validationErrorEmail');
            }
        }
        return errors;
    };