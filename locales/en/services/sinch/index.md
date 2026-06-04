---
title: "Sinch Notifications"
description: "Send Sinch notifications."
sidebar:
  label: "Sinch"

source: https://sinch.com

schemas:
  - sinch

has_sms: true

sample_urls:
  - sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/{PhoneNo}
  - sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

To use Sinch, you will need to acquire your _Service Plan ID_ and _API Token_. Both of these are accessible via the [Sinch Dashboard](https://dashboard.sinch.com/sms/overview) or through [the API section](https://dashboard.sinch.com/sms/api/rest).

You'll need to have a number defined as an Active Number ([from your dashboard here](https://dashboard.sinch.com/numbers/your-numbers/number)). This will become your **`{FromPhoneNo}`** when identifying the details below.

## Syntax

Valid syntax is as follows:

- `sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/{PhoneNo}`
- `sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

If no _ToPhoneNo_ is specified, then the _FromPhoneNo_ will be messaged instead; hence the following is a valid URL:

- `sinch://{ServicePlanID}:{ApiToken}@{FromPhoneNo}/`

Short Codes are also supported but require at least 1 Target PhoneNo

- `sinch://{ServicePlanID}:{ApiToken}@{ShortCode}/{PhoneNo}`
- `sinch://{ServicePlanID}:{ApiToken}@{ShortCode}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Parameter Breakdown

| Variable      | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ServicePlanID | Yes      | The _Account SID_ associated with your Sinch account. This is available to you via the Sinch Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ApiToken      | Yes      | The _Auth Token_ associated with your Sinch account. This is available to you via the Sinch Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| FromPhoneNo   | **\*No** | The [Active Phone Number](https://dashboard.sinch.com/numbers/your-numbers/number) associated with your Sinch account you wish the SMS message to come from. It must be a number registered with Sinch. As an alternative to the **FromPhoneNo**, you may also provide a **ShortCode** here instead. The phone number MUST include the country codes dialling prefix as well when placed. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion. |
| ShortCode     | **\*No** | The ShortCode associated with your Sinch account you wish the SMS message to come from. It must be a number registered with Sinch. As an alternative to the **ShortCode**, you may provide a **FromPhoneNo** instead.                                                                                                                                                                                                                                                                                                                       |
| PhoneNo       | **\*No** | A phone number MUST include the country codes dialling prefix as well when placed. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion.<br/>**Note:** If you're using a _ShortCode_, then at least one _PhoneNo_ MUST be defined.                                                                                                                                                                                                              |
| Region        | **No**   | Can be either `us` or `eu`. By default the region is set to `us`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Sinch Notification as an SMS:

```bash
# Assuming our {ServicePlanID} is AC735c307c62944b5a
# Assuming our {ApiToken} is e29dfbcebf390dee9
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   sinch://AC735c307c62944b5a:e29dfbcebf390dee9@19005559999/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   sinch://AC735c307c62944b5a:e29dfbcebf390dee9@1-(900) 555-9999/1-(800) 555-1223
```
