import { React, Component } from "react";

// Test Server
let baseURL = `https://cmschamps.com/pnp/index.php/`;
// "homepage": "https://cmschamps.com/pnp-mobile/sp/#",

//Live Server
// let baseURL = `https://www.petsfolio.com/pnp/index.php/`;
// "homepage": "https://xhtmlreviews.com/pfserviceapp/#/",

export class Services extends Component{

static myInstance = null;

static getInstance() {  
    return new Services();
}

async newLogin(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/login`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(obj),
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async verifyOTP(obj) {
    try {
      let response = await fetch(
        baseURL + (`api/service_providers/otp`),
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        }
      )
      let responseJson = await response.json();
        return responseJson;  
    } catch (error) {
      console.log(error);
      return error;
    }
}


async newRegistration(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/register`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            }
        )
        let responseJson = await response.json();
            return responseJson;
        
    } catch (error) {
        console.log(error);
        return error;
    }
}




async allServicesHomePage() {
    try {
        let response = await fetch(
            baseURL + (`api/home/home`),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async delayedVerification(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/verify`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}




async serviceProviderProfileUpdate(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/update`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async getBoarding_Price_Details() {
    try {
        let response = await fetch(
            baseURL + (`api/home/boarding_prices`),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async getBoarding_Add_Ons_Details() {
    try {
        let response = await fetch(
            baseURL + (`api/home/boarding_addons`),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async getBoarding_Food_Types(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/home/food_items`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async getBoarding_Food_Prices(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/home/food_prices`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async getBoarding_ServiceCost_Preview(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/cost`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async WalkingServiceDataInsert(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/cost`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async GroomingServiceDataInsert(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/cost`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async SittingServiceDataInsert(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/cost`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async TrainingServiceDataInsert(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/cost`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async VetServiceDataInsert(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/cost`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async Service_Provider_Profile_Info(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/info`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async Waiting_Jobs(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/jobwaiting`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async quoteForm(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/quoteForm`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}

async submitQuote(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/submitQuote`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}



async MyProposals(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/myProposals`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}


async EditProposal(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/editQuoteForm`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async MyActiveJobs(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getSPBookings`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async MyActiveJobsDetails(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getSPBookingDetails`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async ListofServices(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getSPServices`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async AddServices(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/updateSPServices`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async releaseRequest(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/releaseRequest`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}

async EditProfile(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/updateSpDetails`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async AddImages(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/Users/spServiceImages`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}

async DeleteImages(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/deletespServiceImages`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async PreviousImages(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/spServiceImagesList`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async NotificationsData(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getNotifications`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async SpReviews(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/gerSpReviews`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async SPProofsStatus(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/proofsStatues`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async SPUpdateProofs(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/service_providers/updateProofs`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async SPWallet(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/spWalletDetails`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async SPJobsMissed(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/spMissedJobs`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}

async SPGetNotified(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getSpNotified`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}

async SPReadNotification(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/spReadNotification`),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error;
    }
}


async createSpBankDetails(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/createSpBankDetails`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(obj),
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async createSpUpiDetails(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/createSpUpiDetails`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(obj),
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async getSpBankDetails(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getSpBankDetails`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(obj),
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async getSpUpiDetails(obj1) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/getSpUpiDetails`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(obj1),
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async updateSpBankDetails(obj) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/updateSpBankDetails`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(obj),
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async updateSpUpiDetails(obj1) {
    try {
        let response = await fetch(
            baseURL + (`api/quotations/updateSpUpiDetails`),
            {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                        },
                body: JSON.stringify(obj1),
            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}













async SendBookingNotificationToClient(obj1) {
    try {
        let response = await fetch(
            `https://fcm.googleapis.com/fcm/send`,
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : "key=AAAAjqk9zaQ:APA91bFuUiElujAJsuT53lhcarrJr7gv628N_SzYIj1L6vVyDCJR6G9V3d8grWyIAU8iSDfKNP2rP6yoBLb0Csh3Sw8bxs-3vfAqWqCvcrbVK2DzozXh0_P7ZIxYSxV7w1qoa4EmfvYr"
                },
                body: JSON.stringify(obj1),

            }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
       console.log(error);
       return error; 
    }
}
































    render() 
    
    {
return (
<div>hello</div>
)


    }
}

export default Services