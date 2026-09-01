import api from "../../auth/api/axios"

export const updateProfile = (data) => {
    return api.patch(`auth/edit-profile/`, data)
}