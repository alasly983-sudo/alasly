import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
    <div className="h-full border-l flex flex-col overflow-y-auto bg-codeup-surface/95 shadow-codeup backdrop-blur-sm">
      <div className="p-6 pb-5">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}