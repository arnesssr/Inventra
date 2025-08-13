import { useEffect } from "react"
import { AuditTrail } from "@/features/audit/components/AuditTrail"
import { AuditSummary } from "@/features/audit/components/AuditSummary"
import { AuditToolbar } from "@/features/audit/components/AuditToolbar"
import { Card } from "@/components/ui/Card"
import { AuditService } from "@/features/audit/services/auditService"

export function AuditsPage() {
  // TODO: Replace with React Query - const mockData = [])
  // TODO: Replace with React Query - const mockData = [])
  // TODO: Replace with React Query - const mockData = []

  useEffect(() => {
    const savedLogs = AuditService.getAuditLogs(1, 10) // Get first page with 10 items
    setLogs(savedLogs)

    const unsubscribe = AuditService.subscribeToAuditLogs((newLog) => {
      // TODO: useAuditStore.getState().addLog(newLog)
    })

    return () => unsubscribe()
  }, [setLogs])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Dashboard</h2>
          <p className="text-muted-foreground">Overview of system activities and changes</p>
        </div>
        <AuditToolbar />
      </div>

      <AuditSummary />
      
      <Card className="p-6">
        <AuditTrail />
      </Card>
    </div>
  )
}
