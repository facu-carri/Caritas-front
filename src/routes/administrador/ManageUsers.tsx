import { useState } from "react"
import Button from "src/components/Button"
import HelpersList from "src/components/helper/HelpersList"

export default function ManagerUsers() {
    

    return (<>
      <div className="min-h-screen bg-gray-100 flex items-center flex-col gap-4 justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Listado de Usuarios</h1>
        <HelpersList helpers={users} onEdit={() => {}} onDelete={() => {}} />
      </div>
      </div>
    </>)
}