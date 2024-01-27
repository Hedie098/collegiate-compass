import requests
import json

def search_school(api_key, school_name):
    base_url = 'https://api.data.gov/ed/collegescorecard/v1/'
    endpoint = 'schools'
    
    params = {
        'api_key': api_key,
        'school.name': school_name,
    }

    response = requests.get(f'{base_url}{endpoint}', params=params)

    if response.status_code == 200:
        data = response.json()
        results = data.get('results')

        if results:
            school_data = {}

            location_info = results[0].get('location')
            if location_info:
                school_data['latitude'] = location_info.get('lat')
                school_data['longitude'] = location_info.get('lon')

            latest_info = results[0].get('latest')
            if latest_info:
                school_data['programs'] = []

                programs_info = latest_info.get('programs')
                if programs_info:
                    cip_4_digit_info = programs_info.get('cip_4_digit', [])
                    for program in cip_4_digit_info:
                        program_info = {
                            'title': program.get('title'),
                            'level': program.get('credential', {}).get('title')
                        }
                        school_data['programs'].append(program_info)

                school_info = latest_info.get('school')
                if school_info:
                    school_data['zip_code'] = school_info.get('zip')
                    school_data['city'] = school_info.get('city')
                    school_data['state'] = school_info.get('state')
                    school_data['address'] = school_info.get('address')
                    school_data['school_url'] = school_info.get('school_url')
                    school_data['online_only'] = 'Yes' if school_info.get('online_only') == 1 else 'No'

                    cost_info = latest_info.get('cost')
                    if cost_info:
                        school_data['book_supply_cost'] = cost_info.get('booksupply')
                        school_data['in_state_tuition'] = cost_info.get('tuition', {}).get('in_state')
                        school_data['out_of_state_tuition'] = cost_info.get('tuition', {}).get('out_of_state')

                    admissions_info = latest_info.get('admissions')
                    if admissions_info:
                        school_data['act_scores'] = admissions_info.get('act_scores', {}).get('midpoint', {})
                        school_data['sat_scores'] = admissions_info.get('sat_scores', {}).get('midpoint', {})

            with open('school_data.json', 'w') as json_file:
                json.dump(school_data, json_file, indent=2)

            print("Data successfully written to 'school_data.json'.")
        else:
            print(f"No results found for '{school_name}'.")
    else:
        print(f"Error: {response.status_code} - {response.text}")

def main():
    api_key = 'kK3BZnAbjkyuoZuB4BW2VapEPB7Z0giWOkm8uKb4'

    school_name = input("Enter the name of the school: ")

    search_school(api_key, school_name)

if __name__ == "__main__":
    main()
