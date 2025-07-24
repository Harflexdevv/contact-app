import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ContactSubmission {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  subject: string
  message: string
  submittedAt: string
}

interface SubmissionsState {
  submissions: ContactSubmission[]
  hasSubmitted: boolean
  addSubmission: (submission: Omit<ContactSubmission, "id" | "submittedAt">) => void
}

export const useSubmissionsStore = create<SubmissionsState>()(
  persist(
    (set, get) => ({
      submissions: [],
      hasSubmitted: false,
      addSubmission: (submission) => {
        const newSubmission: ContactSubmission = {
          ...submission,
          id: Date.now().toString(),
          submittedAt: new Date().toISOString(),
        }
        set({
          submissions: [...get().submissions, newSubmission],
          hasSubmitted: true,
        })
      },
    }),
    {
      name: "submissions-storage",
    },
  ),
)
