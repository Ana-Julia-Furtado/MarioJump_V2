"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, GraduationCap, AlertCircle, CheckCircle } from "lucide-react"

export default function AuthPage() {
  const [loginData, setLoginData] = useState({ username: "", ra: "" })
  const [registerData, setRegisterData] = useState({ username: "", ra: "" })
  const [loginStatus, setLoginStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const [registerStatus, setRegisterStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginStatus({ type: null, message: "" })

    // Validação básica
    if (!loginData.username.trim() || !loginData.ra.trim()) {
      setLoginStatus({ type: "error", message: "Por favor, preencha todos os campos." })
      setIsLoading(false)
      return
    }

    // Simulação de chamada para API
    try {
      // Aqui você faria a chamada real para sua API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simula delay da API

      // Simulação de resposta da API
      const mockResponse = Math.random() > 0.3 // 70% de chance de sucesso

      if (mockResponse) {
        setLoginStatus({ type: "success", message: "Login realizado com sucesso!" })
        // Aqui você redirecionaria o usuário ou salvaria o token
        console.log("Login successful:", loginData)
        setTimeout(() => {
        window.location.href = 'https://ana-julia-furtado.github.io/MarioJump/';
      }, 1500);
      } else {
        setLoginStatus({ type: "error", message: "Usuário ou RA não encontrado." })
      }
    } catch (error) {
      setLoginStatus({ type: "error", message: "Erro ao fazer login. Tente novamente." })
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterStatus({ type: null, message: "" })

    // Validação básica
    if (!registerData.username.trim() || !registerData.ra.trim()) {
      setRegisterStatus({ type: "error", message: "Por favor, preencha todos os campos." })
      setIsLoading(false)
      return
    }

    // Validação do RA (apenas números)
    if (!/^\d+$/.test(registerData.ra)) {
      setRegisterStatus({ type: "error", message: "RA deve conter apenas números." })
      setIsLoading(false)
      return
    }

    // Simulação de chamada para API
    try {
      // Aqui você faria a chamada real para sua API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simula delay da API

      // Simulação de resposta da API
      const mockResponse = Math.random() > 0.2 // 80% de chance de sucesso

      if (mockResponse) {
        setRegisterStatus({ type: "success", message: "Registro criado com sucesso!" })
        // Limpar formulário após sucesso
        setRegisterData({ username: "", ra: "" })
      } else {
        setRegisterStatus({ type: "error", message: "RA já está em uso. Tente outro." })
      }
    } catch (error) {
      setRegisterStatus({ type: "error", message: "Erro ao criar registro. Tente novamente." })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema Acadêmico</h1>
          <p className="text-gray-600">Faça login ou registre-se com seu RA</p>
        </div>

        <Card className="shadow-lg">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registro</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Fazer Login
                </CardTitle>
                <CardDescription>Entre com seu nome de usuário e RA</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Nome de Usuário</Label>
                    <Input
                      id="login-username"
                      type="text"
                      placeholder="Digite seu nome de usuário"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-ra">RA (Registro Acadêmico)</Label>
                    <Input
                      id="login-ra"
                      type="text"
                      placeholder="Digite seu RA"
                      value={loginData.ra}
                      onChange={(e) => setLoginData({ ...loginData, ra: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  {loginStatus.type && (
                    <Alert
                      className={
                        loginStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }
                    >
                      {loginStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription className={loginStatus.type === "success" ? "text-green-800" : "text-red-800"}>
                        {loginStatus.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Criar Registro
                </CardTitle>
                <CardDescription>Registre-se com seu nome de usuário e RA</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Nome de Usuário</Label>
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="Digite seu nome de usuário"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-ra">RA (Registro Acadêmico)</Label>
                    <Input
                      id="register-ra"
                      type="text"
                      placeholder="Digite seu RA (apenas números)"
                      value={registerData.ra}
                      onChange={(e) => setRegisterData({ ...registerData, ra: e.target.value })}
                      disabled={isLoading}
                    />
                    <p className="text-sm text-gray-500">O RA deve ser único e conter apenas números</p>
                  </div>

                  {registerStatus.type && (
                    <Alert
                      className={
                        registerStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }
                    >
                      {registerStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription
                        className={registerStatus.type === "success" ? "text-green-800" : "text-red-800"}
                      >
                        {registerStatus.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Sistema desenvolvido para gerenciamento acadêmico</p>
        </div>
      </div>
    </div>
  )
}
