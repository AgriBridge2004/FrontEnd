import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export default function CreateRFQPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Create RFQ"
        title="Post a buyer request"
        description="This placeholder captures the fields needed to create demand for farmer quotes."
      />
      <form className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField htmlFor="title" label="RFQ title">
            <Input id="title" placeholder="Weekly tomato supply" />
          </FormField>
          <FormField htmlFor="crop" label="Crop or product">
            <Input id="crop" placeholder="Tomatoes" />
          </FormField>
          <FormField htmlFor="quantity" label="Quantity">
            <Input id="quantity" min="0" placeholder="3000" type="number" />
          </FormField>
          <FormField htmlFor="unit" label="Unit">
            <Select id="unit" defaultValue="kg">
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="box">box</option>
              <option value="crate">crate</option>
              <option value="liter">liter</option>
            </Select>
          </FormField>
          <FormField htmlFor="target" label="Target price">
            <Input id="target" min="0" placeholder="0.85" step="0.01" type="number" />
          </FormField>
          <FormField htmlFor="deadline" label="Quote deadline">
            <Input id="deadline" type="date" />
          </FormField>
          <FormField htmlFor="location" label="Delivery location">
            <Input id="location" placeholder="Ramallah, Palestine" />
          </FormField>
          <FormField htmlFor="quality" label="Preferred quality">
            <Select id="quality" defaultValue="A">
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="any">Any inspected grade</option>
            </Select>
          </FormField>
        </div>
        <FormField htmlFor="notes" label="Buyer notes">
          <Textarea id="notes" placeholder="Add packaging, delivery, and inspection requirements." />
        </FormField>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Publish RFQ</Button>
          <Button variant="secondary">Save draft</Button>
        </div>
      </form>
    </div>
  );
}
