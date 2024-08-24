interface IUser {
    email: string,
    first_name: string,
    last_name: string,
    photoprofile: string
}

export interface IAuthor {
    id?: string;
    first_name?: string;
    last_name?: string;
    profile?: IProfile;
}