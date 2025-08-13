import { Card } from "@/../components/ui/Card"
import { useAuditStore } from "@/../store/auditStore"

export function AuditCharts() {
  const logs = useAuditStore(state => state.logs)

  // Empty for now, will be implemented with other visualizations later
  return null
}
