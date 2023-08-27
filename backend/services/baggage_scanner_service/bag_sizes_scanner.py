"""Credits to https://github.com/Practical-CV/Measuring-Size-of-Objects-with-OpenCV for code nippets of the object size estimator"""

# import the necessary packages
from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np
import imutils
import cv2


class size_scanner():

	def __init__(self, images):
		self.images = images
		self.view = None

	def midpoint(self,ptA, ptB):
		return ((ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5)

	def get_view_size(self, image, view):
		"""Detects an image (bag) and returns the dimension (W,H) of a view.
		Args:
			image: the image.
			view: the view of the image (top or side)     
		"""
		
		# load the image, convert it to grayscale, and blur it slightly
		# image = cv2.imread(args["image"])
		image = cv2.imread(image)
		gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
		gray = cv2.GaussianBlur(gray, (7, 7), 0)

		# perform edge detection, then perform a dilation + erosion to
		# close gaps in between object edges
		edged = cv2.Canny(gray, 50, 100)
		edged = cv2.dilate(edged, None, iterations=1)
		edged = cv2.erode(edged, None, iterations=1)

		# find contours in the edge map
		cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,
			cv2.CHAIN_APPROX_SIMPLE)
		cnts = imutils.grab_contours(cnts)

		# sort the contours from left-to-right and initialize the
		# 'pixels per metric' calibration variable
		(cnts, _) = contours.sort_contours(cnts)
		pixelsPerMetric = None


		# loop over the contours individually
		for c in cnts:
			# if the contour is not sufficiently large, ignore it
			ca = cv2.contourArea(c)
			
			if view == "top":
				# if ca != 90966.0:
				# 	continue
				if ca < 1000 :
					continue
				print(ca)
			else:
				if ca != 236901.5:
					continue
				# if ca < 1000 :
				# 	continue
				# print(ca)
		
			# compute the rotated bounding box of the contour
			labeled_img = image.copy()
			box = cv2.minAreaRect(c)
			box = cv2.cv.BoxPoints(box) if imutils.is_cv2() else cv2.boxPoints(box)
			box = np.array(box, dtype="int")

			# order the points in the contour such that they appear
			# in top-left, top-right, bottom-right, and bottom-left
			# order, then draw the outline of the rotated bounding
			# box
			box = perspective.order_points(box)
			cv2.drawContours(labeled_img, [box.astype("int")], -1, (0, 255, 0), 2)

			# loop over the labeled_imginal points and draw them
			for (x, y) in box:
				cv2.circle(labeled_img, (int(x), int(y)), 5, (0, 0, 255), -1)

			# unpack the ordered bounding box, then compute the midpoint
			# between the top-left and top-right coordinates, followed by
			# the midpoint between bottom-left and bottom-right coordinates
			(tl, tr, br, bl) = box
			(tltrX, tltrY) = self.midpoint(tl, tr)
			(blbrX, blbrY) = self.midpoint(bl, br)

			# compute the midpoint between the top-left and top-right points,
			# followed by the midpoint between the top-righ and bottom-right
			(tlblX, tlblY) = self.midpoint(tl, bl)
			(trbrX, trbrY) = self.midpoint(tr, br)

			# draw the midpoints on the image
			cv2.circle(labeled_img, (int(tltrX), int(tltrY)), 5, (255, 0, 0), -1)
			cv2.circle(labeled_img, (int(blbrX), int(blbrY)), 5, (255, 0, 0), -1)
			cv2.circle(labeled_img, (int(tlblX), int(tlblY)), 5, (255, 0, 0), -1)
			cv2.circle(labeled_img, (int(trbrX), int(trbrY)), 5, (255, 0, 0), -1)

			# draw lines between the midpoints
			cv2.line(labeled_img, (int(tltrX), int(tltrY)), (int(blbrX), int(blbrY)),
				(255, 0, 255), 2)
			cv2.line(labeled_img, (int(tlblX), int(tlblY)), (int(trbrX), int(trbrY)),
				(255, 0, 255), 2)

			# compute the Euclidean distance between the midpoints
			dA = dist.euclidean((tltrX, tltrY), (blbrX, blbrY))
			dB = dist.euclidean((tlblX, tlblY), (trbrX, trbrY))

			# if the pixels per metric has not been initialized, then
			# compute it as the ratio of pixels to supplied metric
			# (in this case, inches)
			if pixelsPerMetric is None:
				pixelsPerMetric = dB / .955

			# compute the size of the object
			dimA = (dA / 38) - 12
			dimB = (dB / 38) - 12

			# draw the object sizes on the image
			cv2.putText(labeled_img, "{:.1f}in".format(dimA),
				(int(tltrX - 15), int(tltrY - 10)), cv2.FONT_HERSHEY_SIMPLEX,
				0.65, (255, 255, 255), 2)
			cv2.putText(labeled_img, "{:.1f}in".format(dimB),
				(int(trbrX + 10), int(trbrY)), cv2.FONT_HERSHEY_SIMPLEX,
				0.65, (255, 255, 255), 2)

			# show the output image
			if view == "top":
				labeled_img = cv2.resize(labeled_img, (1280, 720), interpolation= cv2.INTER_LINEAR) #resize video
			else:
				labeled_img = cv2.resize(labeled_img, (500, 700), interpolation= cv2.INTER_LINEAR) #resize video
			cv2.imshow("Image", labeled_img)
			cv2.waitKey(10000) #10000
			cv2.imwrite("images/return" + view +".png", labeled_img)
			return (dimA, dimB)
	
	def get_bag_size(self):   
		length, width, height = 0,0,0
		for view, image in self.images.items():
			size = self.get_view_size(image, view)
			print('{0} view has the size {1}'.format(view, size))
			if view == "top":
				height, width = size[0], size[1]
			else:
				length = size[0]
		dimensions = length, width, height
		return dimensions
		
def main():	
	images = {"top":"images/top.png","side":"images/side.png"}
	# images  = {"top":"images/checked_top.png"}
	scanner = size_scanner(images)
	print(scanner.get_bag_size())


if __name__ == "__main__":
    main()

