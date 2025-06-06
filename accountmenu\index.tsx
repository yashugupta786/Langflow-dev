import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import { useLogout } from "@/controllers/API/queries/auth";
import { CustomProfileIcon } from "@/customization/components/custom-profile-icon";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useAuthStore from "@/stores/authStore";
import { cn } from "@/utils/utils";
import {
  HeaderMenu,
  HeaderMenuItemButton,
  HeaderMenuItems,
  HeaderMenuToggle,
} from "../HeaderMenu";
import ThemeButtons from "../ThemeButtons";
import { User2 } from "lucide-react"; // You can use any icon or the EXL logo

export const AccountMenu = () => {
  const navigate = useCustomNavigate();
  const { mutate: mutationLogout } = useLogout();

  // Get userData (contains email/username) from the store
  const { userData, autoLogin } = useAuthStore((state) => ({
    userData: state.userData,
    autoLogin: state.autoLogin,
  }));

  // This will show email, or fallback to username or "User"
  const displayName = userData?.email || userData?.username || "User";

  const handleLogout = () => {
    mutationLogout();
  };

  return (
    <HeaderMenu>
      <HeaderMenuToggle>
        <div
          className="h-6 w-6 rounded-lg focus-visible:outline-0"
          data-testid="user-profile-settings"
        >
          <CustomProfileIcon />
        </div>
      </HeaderMenuToggle>
      <HeaderMenuItems position="right" classNameSize="w-[272px]">
        <div className="divide-y divide-foreground/10">
          {/* Name at top, styled */}
          <div className="flex flex-col items-start px-4 pt-5 pb-2">
            <span className="text-[11px] uppercase text-muted-foreground tracking-widest mb-1 font-semibold">Signed in as</span>
            <span
              className={cn(
                "flex items-center text-lg font-extrabold bg-gradient-to-r from-[#00f0ff] via-[#2dd4bf] to-[#0284c7] bg-clip-text text-transparent tracking-wide drop-shadow-glow select-all"
              )}
              title={displayName}
            >
              <User2 className="h-5 w-5 mr-2 text-[#00f0ff] opacity-75" />
              {displayName}
            </span>
          </div>

          <div>
            <HeaderMenuItemButton
              onClick={() => {
                navigate("/settings");
              }}
            >
              <span
                data-testid="menu_settings_button"
                id="menu_settings_button"
                className="text-base font-medium"
              >
                <ForwardedIconComponent
                  name="settings"
                  className="mr-2 h-5 w-5 text-muted-foreground"
                />
                Settings
              </span>
            </HeaderMenuItemButton>
          </div>

          <div className="flex items-center justify-between px-4 py-[10px] text-sm">
            <span className="font-medium text-base">Theme</span>
            <div className="relative top-[1px] float-right">
              <ThemeButtons />
            </div>
          </div>

          {!autoLogin && (
            <div>
              <HeaderMenuItemButton onClick={handleLogout} icon="log-out">
                <span className="text-base font-medium">
                  <ForwardedIconComponent
                    name="log-out"
                    className="mr-2 h-5 w-5 text-muted-foreground"
                  />
                  Logout
                </span>
              </HeaderMenuItemButton>
            </div>
          )}
        </div>
      </HeaderMenuItems>
    </HeaderMenu>
  );
};

export default AccountMenu;
