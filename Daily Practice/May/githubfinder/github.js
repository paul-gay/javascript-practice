class Github {
    constructor() {
        this.client_id = '5c2f58d01ef5b2133fca';
        this.client_secret = 'f45a9820610726e95291f4b101129bc1ebcdd2fe'
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&${this.client_secret}`);

        // store the response data in profile variable
        const profile = await profileResponse.json();

        // return the response data saved in profile
        return {
            // profile same as profile: profile
            profile
        }
    }
}