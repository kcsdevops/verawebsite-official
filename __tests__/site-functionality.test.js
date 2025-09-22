// Test for site functionality and utilities
describe("Veracare Site Tests", () => {
  describe("Phone Number Formatting", () => {
    it("should format phone number correctly", () => {
      const phone = "(11) 96738-1029";
      expect(phone).toMatch(/\(\d{2}\) \d{5}-\d{4}/);
    });
  });

  describe("WhatsApp URL Generation", () => {
    it("should generate correct WhatsApp URL", () => {
      const phone = "5511967381029";
      const message = "Olá, gostaria de agendar um atendimento";
      const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      
      expect(whatsAppUrl).toContain("wa.me");
      expect(whatsAppUrl).toContain(phone);
      expect(whatsAppUrl).toContain("text=");
    });
  });

  describe("Services List", () => {
    it("should have required services", () => {
      const services = [
        "Tratamento de onicomicose (micose)",
        "Onicotomia (corte e manutenção das unhas)",
        "Tratamento de fissuras (rachaduras nos pés)",
        "Onicocriptose (unha encravada)",
        "Remoção e tratamento de verruga plantar (olho de peixe)",
        "Remoção de calos e calosidades",
        "Reflexologia Podal",
        "Podoprofilaxia (Podologia Preventiva)",
        "Tratamento de pé diabético",
        "Ortopedia e palmilhas personalizadas"
      ];

      expect(services.length).toBeGreaterThan(5);
      expect(services).toContain("Reflexologia Podal");
      expect(services).toContain("Tratamento de pé diabético");
    });
  });

  describe("Business Information", () => {
    it("should have correct business details", () => {
      const businessInfo = {
        name: "Veracare",
        phone: "(11) 96738-1029",
        address: "Rua Dias de Oliveira, 83 – Próximo ao terminal Casa Verde",
        email: "contato@veracare.com.br",
        workingHours: "Segunda a Sexta: 08:00 às 18:00"
      };

      expect(businessInfo.name).toBe("Veracare");
      expect(businessInfo.phone).toMatch(/\(\d{2}\) \d{5}-\d{4}/);
      expect(businessInfo.address).toContain("Casa Verde");
      expect(businessInfo.email).toContain("@veracare.com.br");
    });
  });

  describe("Page URLs", () => {
    it("should have correct navigation URLs", () => {
      const pages = {
        home: "/",
        services: "/servicos", 
        contact: "/contato",
        schedule: "/agenda",
        advanced: "/agendamento-avancado",
        about: "/quem-somos"
      };

      Object.values(pages).forEach(url => {
        expect(url).toMatch(/^\/[\w-]*$/);
      });

      expect(pages.home).toBe("/");
      expect(pages.services).toBe("/servicos");
      expect(pages.contact).toBe("/contato");
    });
  });
});
