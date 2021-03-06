export class UserModel {

    public _id: string;
    public email: string;
    public typeAccount: string;
    public status: number = null;

    public confirmToken: string = null;
    public fullName: string;
    public phone: string;
    public notifications = {
        lk: false,
        email: false
    };

    constructor(private user) {

        this._id = user._id;
        this.email = user.email;
        this.typeAccount = user.typeAccount;
        this.status = user.status || 0;

        this.confirmToken = user.confirmToken || null;
        this.fullName = user.fullName || null;
        this.phone = user.phone || null;

        if (user.notifications) {
            this.notifications.lk = user.notifications.lk;
            this.notifications.email = user.notifications.email;
        } else {
            this.notifications = null;
        }

    }
}