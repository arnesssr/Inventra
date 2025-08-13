import { AuditService } from "@/services/auditService"
import type { AuditEventType } from "@/../types/auditTypes"
import { useClerk } from '@clerk/clerk-react' // Add this import

export function useAuditLog() {
  const { user } = useClerk() // Get current user from Clerk

  const logAction = async (
    action: AuditEventType,
    details: string,
    metadata?: Record<string, any>
  ) => {
    if (!user) return

    await AuditService.logAction(action, user.id, details, {
      metadata: {
        userName: user.fullName,
        ...metadata
      }
    })
  }

  return {
    logAction,
    events: AuditService.EVENTS
  }
}
