export interface App { 
    app_id: number;
    app_name: string;
    app_icon?: string | null;
    app_description?: string;
    apk_url?: string;
    apk_size?: bigint; // Make sure to handle BigInt if used
    category: string;
    app_rating : string;
    app_publisher : string
  }

export interface Image {
  image_url : string;
}