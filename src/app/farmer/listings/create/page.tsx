import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export default function CreateListingPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Create listing"
        title="Add product supply"
        description="This form is ready for validation and API submission once the backend is available."
      />
      <form className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField htmlFor="title" label="Listing title">
            <Input id="title" placeholder="Premium greenhouse tomatoes" />
          </FormField>
          <FormField htmlFor="crop" label="Crop or product">
            <Input id="crop" placeholder="Tomatoes" />
          </FormField>
          <FormField htmlFor="type" label="Listing type">
            <Select id="type" defaultValue="fresh_produce">
              <option value="fresh_produce">Fresh produce</option>
              <option value="processed_goods">Processed goods</option>
              <option value="grains">Grains</option>
              <option value="livestock">Livestock</option>
              <option value="inputs">Inputs</option>
            </Select>
          </FormField>
          <FormField htmlFor="location" label="Location">
            <Input id="location" placeholder="Jenin, Palestine" />
          </FormField>
          <FormField htmlFor="quantity" label="Quantity">
            <Input id="quantity" min="0" placeholder="12" type="number" />
          </FormField>
          <FormField htmlFor="unit" label="Unit">
            <Select id="unit" defaultValue="ton">
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="box">box</option>
              <option value="crate">crate</option>
              <option value="liter">liter</option>
            </Select>
          </FormField>
          <FormField htmlFor="price" label="Price per unit">
            <Input id="price" min="0" placeholder="780" type="number" />
          </FormField>
          <FormField htmlFor="available" label="Available from">
            <Input id="available" type="date" />
          </FormField>
        </div>
        <FormField htmlFor="description" label="Description">
          <Textarea id="description" placeholder="Describe quality, packaging, certifications, and logistics notes." />
        </FormField>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Save listing</Button>
          <Button variant="secondary">Save draft</Button>
        </div>
      </form>
    </div>
  );
}
