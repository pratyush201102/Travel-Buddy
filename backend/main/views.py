# from email.charset import BASE64
# from django.shortcuts import render

# from rest_framework import permissions
# from http.client import HTTPResponse
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import qrcode

# Create your views here.

BASE_URL = 'http://localhost:8000/'


@api_view(["GET"])
def test(request):
    text = request.query_params.get('text')
    data = {'result': text}
    return Response(data)


@api_view(['GET'])
def analyzeImage(request):
    print('got here 1')
    operation_status = True

    if operation_status:
        num_checked_bags = 2  # get the number of checked bags
        checked_bag_prices = 60  # generate it.
        print('got here a')
        booking_id = request.query_params.get('bookingId')
        print('got here b')

        generatedUrl = BASE_URL + \
            f'checkBagsInfo?num_bags={num_checked_bags}&bag_prices={checked_bag_prices}&booking_id={booking_id}'
        # checked_bag_qr = qrcode.QRCode(version=1, box_size=10, border=5)
        # checked_bag_qr.add_data(generatedUrl)
        # checked_bag_qr.make(fit=True)
        # qr_image = checked_bag_qr.make_image(fill='black', back_color='white')
        print('got here c')
        # qr_image.save('checked_bag_qr_code.png')
        print('got here 2')
        data = {
            'status': "OK",
            'dimensions': {
                'length': 10,
                'width': 10,
                'height': 10,
            },
            'generated_image_path': [{
                'side': 'C:\Users\kumar\OneDrive - Fisk University\Desktop\HackathonProject\BeFisk\\backend\services\\baggage_scanner_service\images\side.png',
                'top': 'C:\Users\kumar\OneDrive - Fisk University\Desktop\HackathonProject\BeFisk\\backend\services\\baggage_scanner_service\images\\top.png',
            }],
            'generated_qr_code': 'C:\Users\kumar\Downloads\qrcode.png',
        }
        print('got here 4')
        return Response(data)
    else:
        data = {
            'status': "ERROR",
        }
        return Response(data)


@api_view(['GET'])
def showCheckedBagsInfo(request):
    number_of_bags = request.query_params.get('num_bags')
    total_bag_price = request.query_params.get('bag_prices')
    booking_id = request.query_params.get('booking_id')

    content = f'<div> <span> Number of bags: {number_of_bags} </span> <span> Total bag price : {total_bag_price} </span> <span> Booking ID : {booking_id} </span> </div>'

    return HttpResponse(content, content_type='text/html')
