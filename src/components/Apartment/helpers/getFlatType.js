export default item => ({
    'room': 'Комната',
    '1_room': '1 комн. квартира',
    '2_rooms': '2 комн. квартира',
    '3_rooms': '3 комн. квартира',
    '4_rooms': '4 комн. квартира',
    '5_rooms': '5 комн. квартира',
    '6_rooms': '6 комн. квартира',
})[item.rentType];
