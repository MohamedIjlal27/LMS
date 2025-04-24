import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"

interface PaymentModalProps {
  courseId: string
  price: number
}

export function PaymentModal({ courseId, price }: PaymentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { token, user } = useAuth()

  useEffect(() => {
    const checkEnrollment = async () => {
      if (user && token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/enrollments/check?courseId=${courseId}&studentId=${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          if (response.ok) {
            const data = await response.json()
            setIsEnrolled(data.isEnrolled)
          }
        } catch (error) {
          console.error('Error checking enrollment:', error)
        }
      }
    }

    checkEnrollment()
  }, [user, token, courseId])

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')
    // Format into groups of 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    e.target.value = formattedValue
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted')
    setIsLoading(true)

    if (!token) {
      console.log('No token found')
      toast({
        title: "Error",
        description: "Please login to enroll in this course",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!user) {
      console.log('No user found')
      toast({
        title: "Error",
        description: "User data not found. Please try logging in again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const formData = new FormData(e.currentTarget)
      const paymentData = {
        cardNumber: formData.get("cardNumber")?.toString().replace(/\s/g, ''), // Remove spaces before sending
        cardHolderName: formData.get("cardHolderName"),
        expiryDate: formData.get("expiryDate"),
        cvv: formData.get("cvv"),
        paymentMethod: "card",
      }

      console.log('Payment data:', paymentData)
      console.log('Course ID:', courseId)
      console.log('Token:', token)
      console.log('User:', user)

      // First create enrollment
      console.log('Creating enrollment...')
      const enrollmentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          courseId,
          studentId: user._id 
        }),
      })

      console.log('Enrollment response status:', enrollmentResponse.status)
      if (!enrollmentResponse.ok) {
        const errorData = await enrollmentResponse.json()
        console.log('Enrollment error:', errorData)
        throw new Error(errorData.message || "Failed to create enrollment")
      }

      const enrollment = await enrollmentResponse.json()
      console.log('Enrollment created:', enrollment)

      // Then process payment
      console.log('Processing payment...')
      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollments/${enrollment._id}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        }
      )

      console.log('Payment response status:', paymentResponse.status)
      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json()
        console.log('Payment error:', errorData)
        throw new Error(errorData.message || "Payment failed")
      }

      const paymentResult = await paymentResponse.json()
      console.log('Payment processed:', paymentResult)

      toast({
        title: "Success",
        description: "Payment processed successfully!",
      })
      setIsOpen(false)
      setIsEnrolled(true)
      router.refresh()
    } catch (error) {
      console.error('Error in payment process:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          {isEnrolled ? "Withdraw" : "Enroll Now"}
        </Button>
      </DialogTrigger>
      {!isEnrolled && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
                maxLength={19} // 16 digits + 3 spaces
                onChange={handleCardNumberChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardHolderName">Card Holder Name</Label>
              <Input
                id="cardHolderName"
                name="cardHolderName"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" placeholder="123" required maxLength={4} />
              </div>
            </div>
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : `Pay $${price}`}
              </Button>
            </div>
          </form>
        </DialogContent>
      )}
    </Dialog>
  )
} 