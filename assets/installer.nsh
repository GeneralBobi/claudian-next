!macro customHeader
  ManifestDPIAware true
!macroend

!macro customInstall
  FileOpen $0 "$INSTDIR\install-language.txt" w
  FileWrite $0 "$LANGUAGE"
  FileClose $0
  System::Call 'kernel32::GetTickCount64() l .r1'
  FileOpen $0 "$INSTDIR\install-session.txt" w
  FileWrite $0 "$1"
  FileClose $0
!macroend

; Host artifact ownership is shared with 0.18.7 until migration is implemented.
; Preview uninstall removes only its program files and preserves profiles/connections.
!macro customUnInstall
!macroend
