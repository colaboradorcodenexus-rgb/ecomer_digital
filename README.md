\# EcoMercado Digital 🌾🍋



Solución tecnológica desarrollada para el reto \*\*Eco-Mercado Digital\*\* (Categoría Agropecuario/Medio Ambiente) en Hackathon Nicaragua.



La plataforma conecta directamente a pequeños agro-productores de cítricos y frutas en Nicaragua con supermercados, comercios y consumidores finales, creando un inventario centralizado para evitar pérdidas de cosechas y reducir intermediarios.



\---



\## 🛠️ Tecnologías Utilizadas



\- \*\*Backend:\*\* Python (Django / FastAPI)

\- \*\*Base de Datos:\*\* MySQL (Laragon \& MySQL Workbench)

\- \*\*Frontend:\*\* HTML5, CSS3, JavaScript

\- \*\*Control de Versiones:\*\* Git \& GitHub



\---



\## 🗄️ Modelo de Base de Datos (AF-DEV-02)



La base de datos se encuentra estructurada cumpliendo la \*\*Segunda Forma Normal (2FN)\*\*. El archivo `schema.sql` contiene las tablas organizadas sin redundancias de dependencias parciales.



\---



\## 👥 Definición de Roles y Permisos (AF-DEV-05)



| Rol | Alcance y Permisos |

| :--- | :--- |

| \*\*Admin\*\* | Acceso total al sistema. Gestión de usuarios, moderación de publicaciones e inventarios. |

| \*\*Usuario (Productor)\*\* | Registra y gestiona el inventario de cosechas (frutas/cítricos), precios y fechas de corte. |

| \*\*Usuario (Comprador)\*\* | Explora el catálogo centralizado y realiza pedidos directos a los productores. |

| \*\*Auditor\*\* | Acceso de solo lectura (\*Read-Only\*). Revisa reportes de transacciones y estimación de desperdicio reducido. |



\---



## 🚀 Instalación y Ejecución Local

1. Clonar el repositorio:

```bash
git clone [https://github.com/colaboradorcodenexus-rgb/ecomer_digital.git](https://github.com/colaboradorcodenexus-rgb/ecomer_digital.git)