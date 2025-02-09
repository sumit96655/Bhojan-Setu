import { DonationForm } from "./DonationForm"
import { DonationList } from "./DonationList"
import { ImpactDashboard } from "./ImpactDashboard"

export default function DonorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-green-600">Donor Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <DonationForm />
            <ImpactDashboard />
          </div>
          <div>
            <DonationList />
          </div>
        </div>
      </main>
    </div>
  )
}

