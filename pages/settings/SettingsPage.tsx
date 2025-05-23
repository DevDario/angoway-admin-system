import { useState } from "react";
import Layout from "../_layout";
import SectionHeader from "../../components/SectionHeader";
import {
  faCog,
  faUser,
  faBell,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import "./SettingsPage.css";

const SECTIONS = [
  { key: "general", label: "Geral", icon: faCog },
  { key: "account", label: "Conta", icon: faUser },
  { key: "notifications", label: "Notificações", icon: faBell },
  { key: "appearance", label: "Aparência", icon: faPalette },
];

export default function SettingsPage() {
  const [selected, setSelected] = useState("general");

  return (
    <Layout>
      <div className="content-container settings-container">
        <div className="settings-main">
          <aside className="settings-sidebar">
            <ul>
              {SECTIONS.map((section) => (
                <li
                  key={section.key}
                  className={selected === section.key ? "active" : ""}
                  onClick={() => setSelected(section.key)}
                >
                  <span className="sidebar-icon">
                    <SectionHeader icon={section.icon} title={section.label} />
                  </span>
                </li>
              ))}
            </ul>
          </aside>
          <section className="settings-content">
            {selected === "general" && (
              <div className="settings-section">
                <SectionHeader icon={faCog} title="Geral" />
                <div className="settings-fields">
                  <label>
                    Nome do Sistema
                    <input
                      type="text"
                      placeholder="Nome do sistema"
                      defaultValue="Angoway"
                    />
                  </label>
                  <label>
                    Descrição
                    <textarea
                      placeholder="Descrição do sistema"
                      defaultValue="Central de Monitoramento dos Sistemas que Constituem as soluções Angoway, nomeadamente, o aplicativo para motorista, aplicativo para o utente e a central de dados."
                    />
                  </label>
                </div>
              </div>
            )}
            {selected === "account" && (
              <div className="settings-section">
                <SectionHeader icon={faUser} title="Conta" />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Formulário enviado!");
                  }}
                >
                  <div className="settings-fields">
                    <label>
                      Email
                      <input type="email" placeholder="Seu email" />
                    </label>
                    <label>
                      Nova Senha
                      <input type="password" placeholder="Nova senha" />
                    </label>
                  </div>
                  <button
                    type="submit"
                    style={{ display: "none" }}
                    aria-hidden="true"
                    tabIndex={-1}
                  ></button>
                </form>
              </div>
            )}
            {selected === "notifications" && (
              <div className="settings-section">
                <SectionHeader icon={faBell} title="Notificações" />
                <div className="settings-fields">
                  <label>
                    <input type="checkbox" checked/>
                    Receber notificações dos alertas
                  </label>
                  <label>
                    <input type="checkbox" />
                    Efeitos sonoros
                  </label>
                </div>
              </div>
            )}
            {selected === "appearance" && (
              <div className="settings-section">
                <SectionHeader icon={faPalette} title="Aparência" />
                <div className="settings-fields">
                  <label>
                    Tema
                    <select>
                      <option value="dark">Escuro</option>
                    </select>
                  </label>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}
