import * as  Yup from "yup";

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
    photo : Yup.string().url("آدرس معتبر نیست").required("تصویر مخاطب الزامی می باشد"),
    mobile: Yup.number().required("شماره موبایل الزامی می باشد"),
    email: Yup.string().email("آدرس ایمیل صحیح نیست").required("ایمیل الزامی می باشد"),
    job: Yup.string().nullable() ,                                                           //mitune khali bashe
    group: Yup.string().required("انتخاب گروه الزامی می باشد")
})