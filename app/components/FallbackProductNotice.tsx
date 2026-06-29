export function FallbackProductNotice() {
  return (
    <aside className="notice" role="note">
      <strong>Static catalog preview.</strong>
      <span>
        This page is rendering from the uploaded Series-A material because live Shopify product data
        was not returned. Connect matching Shopify product handles to activate cart purchase forms.
      </span>
    </aside>
  );
}
